/**
 * useRegister Hook
 * Handles athlete registration form submission
 */

import { useState, useEffect, useRef } from "react";
import { emitDashboardRefresh } from "./eventBus";
import { addAthlete } from "../lib/data/writer/dataWriter";
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

      // Map FormData to Athlete format
      const athleteData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        firstNameKh: formData.firstNameKh || undefined,
        lastNameKh: formData.lastNameKh || undefined,
        dateOfBirth: formData.dateOfBirth,
        gender: (formData.gender || "male") as "male" | "female" | "other",
        province: formData.province || "",
        department: formData.department || undefined,
        eventType: formData.eventType || undefined,
        sports: formData.selectedSport ? [formData.selectedSport] : [],
        sportCategory:
          formData.sportCategory || formData.typeOfSport || undefined,
        position: formData.position || undefined,
        nationalID: formData.nationalID || undefined,
        email: formData.email || "",
        phone: formData.phoneNumber,
        registrationDate: new Date().toISOString().split("T")[0],
        registeredAt: new Date().toISOString(),
        status: "approved" as const,
        medals: { gold: 0, silver: 0, bronze: 0 },
        photoUrl: formData.photoUpload
          ? URL.createObjectURL(formData.photoUpload)
          : "/avatars/default.jpg",
      };

      await addAthlete(athleteData);

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
