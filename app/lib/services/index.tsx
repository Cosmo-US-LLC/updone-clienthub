import { BASE_URL } from "../constants";
import Cookies from "js-cookie";
import store from "../store/store";
import { clearAuth, setEmpty as setAuthEmpty } from "@/app/lib/store/features/authSlice";
import { setEmpty as setJobEmpty } from "@/app/lib/store/features/jobCreateSlice";
import { setEmpty as setBookingEmpty } from "@/app/lib/store/features/bookingSlice";
import { setEmpty as setStaffEmpty } from "@/app/lib/store/features/staffSlice";
import { setEventsEmpty } from "../store/features/eventSlice";

interface RequestOptions<T> {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'; // Adjust as per your API needs
    body?: T; // Generic type for request body
    headers?: Record<string, string>;
}

interface ApiResponse<T> {
    data: T; // Generic type for response data
    status: number;
    message?: string;
}

export async function apiRequest<T>(
    url: string, 
    options: RequestOptions<T>, 
    handleError?: (message: string,statusCodeMessage?:number) => void, // Pass the error handler function as an argument
    getResetMessage?: (message: string|undefined) => void // Pass the error handler function as an argument
): Promise<any> {
    const defaultHeaders = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...options.headers, // Merge additional headers if provided
    };

    try {
        const response = await fetch(`${BASE_URL}${url}`, {
            ...options,
            headers: defaultHeaders,
            cache: 'no-cache',
            body: options.body ? JSON.stringify(options.body) : undefined // Serialize body if present
        });

        const data: ApiResponse<T> = await response.json();
        if (!response?.ok) {
            const errorMessage = data.message || 'Failed to fetch data';
            const statusCodeMessage = data.status;
            handleError?.(errorMessage,statusCodeMessage); // Show modal with error message
        }
        if (data.message) {
            getResetMessage?.(data.message)
        }

        if (data?.message == "Unauthenticated.") {
            console.log("Error here")
            console.log(data)
            store.dispatch(clearAuth());
            store.dispatch(setStaffEmpty());
            store.dispatch(setBookingEmpty());
            store.dispatch(setJobEmpty());
            store.dispatch(setAuthEmpty());
            store.dispatch(setEventsEmpty());
            Cookies.remove("authToken");
            Cookies.remove("authData");
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/logout?status=401`
            return;
        }
        return data.data; // Return data for successful response
    } catch (error) {
        console.log("Error here")
        console.log(error)
        const errorMessage = (error as Error).message || 'Failed to fetch data';
        handleError?.(errorMessage); // Show modal with error message
        return error; // Re-throw the error to handle in the component
    }
}
