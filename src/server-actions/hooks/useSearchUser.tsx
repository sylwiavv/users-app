import { IUser } from "../../app/types/users";

export const useSearchUser = ({ query, data }: { query: string | string[]; data: IUser[] }) => {
  let lowerCaseQuery = Array.isArray(query) ? query.map(q => q.toLowerCase().trim()) : [query.toLowerCase().trim()];

  return data.filter((user: IUser) => {
    const fullName = `${user.first_native_name} ${user.last_native_name} ${user.first_name} ${user.last_name}`.toLowerCase().trim();

    const matchesQuery = lowerCaseQuery.every((searchTerm) => {
      return (
        user.skype.toLocaleLowerCase().trim().includes(searchTerm) ||
        user.building === (query) ||
        Number(user.room) === (Number(query)) ||
        Number(user.phone) === (Number(query)) ||
        Number(user.desk_number) === (Number(query)) ||
        user.department.toLocaleLowerCase().trim().includes(searchTerm) ||
        user.email.toLowerCase().trim().includes(searchTerm) ||
        user.first_native_name.toLowerCase().trim().includes(searchTerm) ||
        user.last_native_name.toLowerCase().trim().includes(searchTerm) ||
        user.id.toLowerCase().trim().includes(searchTerm) ||
        user.first_name.toLowerCase().trim().includes(searchTerm) ||
        user.last_name.toLowerCase().trim().includes(searchTerm) ||
        fullName.includes(searchTerm)
      );
    });

    return matchesQuery;
  });
};
