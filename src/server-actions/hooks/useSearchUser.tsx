import { IUser } from "../../app/types/users";

export const useSearchUser = ({query, data}: {query: string, data: IUser[]}) => {
    const lowerCaseQuery = query.toLowerCase().trim();

    return data.filter((user: IUser) => {
        const fullName = `${user.first_native_name} ${user.last_native_name}${user.first_name} ${user.last_name}`.toLowerCase().trim();
        return (
          user.first_native_name.toLowerCase().trim().includes(lowerCaseQuery),
          user.last_native_name.toLowerCase().trim().includes(lowerCaseQuery),
          user.id.toLowerCase().trim().includes(lowerCaseQuery) ||
          user.first_name.toLowerCase().trim().includes(lowerCaseQuery) ||
          user.last_name.toLowerCase().trim().includes(lowerCaseQuery) ||
          fullName.includes(lowerCaseQuery)
        );
      });
}