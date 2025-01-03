export interface IManager {
    id: string;
    first_name: string;
    last_name: string;
}

export interface IVisa {
    issuing_country: string;
    type: string;
    start_date: Date | string;
    end_date: Date | string;
}

export interface IDateOfBirth {
    year: number;
    month: number;
    day: number;
}

export enum EUserRole { EMPLOYEE = "EMPLOYEE", ADMIN = "ADMIN", HR = "HR" }

export interface IUser {
    id: string;
    isRemoteWork: boolean;
    user_avatar: string;
    first_name: string;
    last_name: string;
    first_native_name: string;
    last_native_name: string;
    middle_native_name: string;
    department: string;
    building: string;
    room: string;
    date_birth: IDateOfBirth;
    desk_number: number | "";
    manager: IManager;
    manager_id: Pick<IManager, "id">
    phone: string;
    email: string;
    skype: string;
    cnumber: string;
    citizenship: string;
    visa: IVisa[];
    role: EUserRole;
}

export interface ISigInUser {
    id: string,
    email: string,
    password: string
    isAuthenticated: boolean
}