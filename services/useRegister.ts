/**
 * useRegister Hook
 * Handles participant registration form submission
 */

import { useState, useEffect, useRef } from "react";
import { emitDashboardRefresh } from "./eventBus";
import { addParticipant } from "../lib/data/writer/dataWriter";
import { FormData } from "../types/registration";

interface UseRegisterReturn {
  submitRegistration: (formData: FormData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const reset = () => {
    if (isMountedRef.current) {
      setLoading(false);
      setError(null);
      setSuccess(false);
    }
  };

  const submitRegistration = async (formData: FormData): Promise<void> => {
    try {
      if (isMountedRef.current) {
        setLoading(true);
        setError(null);
        setSuccess(false);
      }

      // Map FormData to Participant format (includes role identity)
      const participantData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        firstNameKh: formData.firstNameKh || undefined,
        lastNameKh: formData.lastNameKh || undefined,
        dateOfBirth: formData.dateOfBirth,
        gender: (formData.gender === "Female" ? "Female" : "Male") as "Male" | "Female",
        nationality: formData.nationality || undefined,
        role: formData.position?.role || undefined,
        organization: formData.organization || undefined,
        sports: (formData.sports && formData.sports.length) ? formData.sports : (formData.sport ? [formData.sport] : []),
        sportCategory: (formData as any).category ?? formData.sport ?? undefined,
        nationalID: formData.nationalID || undefined,
        phone: formData.phone || undefined,
        registrationDate: new Date().toISOString().split("T")[0],
        registeredAt: new Date().toISOString(),
        status: "approved" as const,
        medals: { gold: 0, silver: 0, bronze: 0 },
        photoUrl: formData.photoUpload
          ? URL.createObjectURL(formData.photoUpload)
          : "/avatars/default.jpg",
      };

      await addParticipant(participantData);

      if (isMountedRef.current) {
        setSuccess(true);
        emitDashboardRefresh();
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage =
          err instanceof Error ? err.message : "Registration failed";
        setError(errorMessage);
      }
      throw err;
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return {
    submitRegistration,
    loading,
    error,
    success,
    reset,
  };
};
