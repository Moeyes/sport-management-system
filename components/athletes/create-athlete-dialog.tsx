// "use client";

// import { useState } from "react";
// import { CreateEntityDialog } from "@/components/common/CreateEntityDialog";
// import { Input } from "@/components/ui/input";
// import type { Athlete, AthleteStatus } from "@/types";

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onCreate: (a: Athlete) => void;
// };

// export function CreateAthleteDialog({ open, onOpenChange, onCreate }: Props) {
//   const [name, setName] = useState("");
//   const [province, setProvince] = useState("");
//   const [sport, setSport] = useState("");
//   const [status, setStatus] = useState<AthleteStatus>("Pending");

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     const newAthlete: Athlete = {
//       id: Math.random().toString(36).substr(2, 9),
//       name,
//       province,
//       sports: sport ? [sport] : [],
//       status,
//       medals: { gold: 0, silver: 0, bronze: 0 },
//       registeredAt: "",
//       firstName: "",
//       lastName: "",
//       dateOfBirth: "",
//       gender: "other",
//       email: "",
//       phone: "",
//       registrationDate: "",
//     };
//     onCreate(newAthlete);
//     setName("");
//     setProvince("");
//     setSport("");
//     setStatus("Pending");
//   }

//   return (
//     <CreateEntityDialog
//       open={open}
//       onOpenChange={onOpenChange}
//       title="Register Athlete"
//       description="Add a new athlete"
//       onSubmit={handleSubmit}
//       submitLabel="Register"
//     >
//       {/* <div className="grid gap-1">
//         <label className="text-sm font-medium">Photo</label>
//         <Input value={avator}/>
//       </div> */}
//       <div className="grid gap-1">
//         <label className="text-sm font-medium">Name</label>
//         <Input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//       </div>

//       <div className="grid gap-1">
//         <label className="text-sm font-medium">Province</label>
//         <Input
//           value={province}
//           onChange={(e) => setProvince(e.target.value)}
//           required
//         />
//       </div>

//       <div className="grid gap-1">
//         <label className="text-sm font-medium">Sport</label>
//         <Input
//           value={sport}
//           onChange={(e) => setSport(e.target.value)}
//           required
//         />
//       </div>

//       <div className="grid gap-1">
//         <label className="text-sm font-medium">Status</label>
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value as AthleteStatus)}
//           className="h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium"
//         >
//           <option value="Approved">Approved</option>
//           <option value="Pending">Pending</option>
//           <option value="Rejected">Rejected</option>
//         </select>
//       </div>
//     </CreateEntityDialog>
//   );
// }

// export default CreateAthleteDialog;
