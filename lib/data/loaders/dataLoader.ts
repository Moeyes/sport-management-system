// @ts-nocheck
// import { DashboardStats, Province, Sport, Athlete, Medal, RecentRegistration } from '@/types';

// // Import JSON data
// import provincesData from '../mock/provinces.json';
// import sportsData from '../mock/sports.json';
// import athletesData from '../mock/athletes.json';
// import medalsData from '../mock/medals.json';
// import recentRegistrationsData from '../mock/recent-registrations.json';
// import eventsData from '../mock/events.json';
// import dashboardMetaData from '../mock/dashboard-meta.json';

// // Type-safe data exports
// export const provinces: Province[] = provincesData as Province[];
// export const sports: Sport[] = sportsData as Sport[];
// // export const athletes: Athlete[] = athletesData as Athlete[];
// // Normalize medal mock data to match the `Medal` type (ensure `event` exists)
// export const medals: Medal[] = (medalsData as any[]).map((m) => ({
//   id: m.id,
//   athleteId: m.athleteId,
//   athleteName: m.athleteName,
//   athleteNameKh: m.athleteNameKh,
//   sportId: m.sportId,
//   sportName: m.sportName,
//   medalType: m.medalType as any,
//   province: m.province,
//   awardedDate: m.awardedDate,
//   event: m.event ?? m.eventName ?? m.eventId ?? '',
// } as Medal));
// export const recentRegistrations: RecentRegistration[] = recentRegistrationsData as RecentRegistration[];

// // Compute dashboard stats from current mock datasets
// export const dashboardStats: DashboardStats = {
//   totalAthletes: athletes.length,
//   totalSports: sports.length,
//   totalProvinces: provinces.length,
//   totalMedals: medals.length,
//   activeCompetitions: (eventsData as any[]).filter((e: any) => e.status === 'upcoming').length,
//   pendingRegistrations: recentRegistrations.filter((r) => r.status === 'pending').length,
// };

// // Dashboard meta (title, subtitle, status, lastUpdated) - exported for server components
// export const dashboardMeta = dashboardMetaData as { title: string; subtitle?: string; status?: string; lastUpdated?: string };


// // Helper functions
// export function getProvinceById(id: string): Province | undefined {
//   return provinces.find(p => p.id === id);
// }

// export function getSportById(id: string): Sport | undefined {
//   return sports.find(s => s.id === id);
// }

// export function getAthleteById(id: string): Athlete | undefined {
//   return athletes.find(a => a.id === id);
// }

// // export function getAthletesByProvince(province: string): Athlete[] {
// //   return athletes.filter(a => a.province === province);
// // }

// export function getMedalsByAthlete(athleteId: string): Medal[] {
//   return medals.filter(m => m.athleteId === athleteId);
// }

// export function getMedalsByProvince(province: string): Medal[] {
//   return medals.filter(m => m.province === province);
// }
