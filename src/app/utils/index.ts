import axios from "axios";
import CryptoJS from "crypto-js";

const secretKey = "HDNDT-JDHT8FNEK-JJHR";
const COOKIE_EXPIRY = 60 * 60 * 1000;

const setCookie = (name: string, value: string, expiryMs: number, secure = false) => {
    const date = new Date();
    date.setTime(date.getTime() + expiryMs);
    const expires = "expires=" + date.toUTCString();
    const secureFlag = secure ? ";secure;samesite=strict" : "";
    document.cookie = `${name}=${value};${expires};path=/${secureFlag}`;
};

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
};

export const encrypt = (text: string) => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (cipherText: string) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const saveRecord = (key: string, value: any) => {
    try {
        const encryptedValue = encrypt(JSON.stringify(value));
        setCookie(key, encryptedValue, COOKIE_EXPIRY);
    } catch (error) {
        console.error("Lỗi khi lưu cookie:", error);
    }
};

export const getRecord = (key: string) => {
    try {
        const encryptedValue = getCookie(key);
        if (!encryptedValue) return null;

        const decryptedValue = decrypt(encryptedValue);
        if (!decryptedValue) return null;

        try {
            return JSON.parse(decryptedValue);
        } catch (e) {
            console.error("Lỗi khi parse JSON:", e);
            return null;
        }
    } catch (error) {
        console.error("Lỗi khi đọc cookie:", error);
        return null;
    }
};

export const sendAppealForm = async (values: any) => {
    try {
        const jsonString = JSON.stringify(values);
        const encryptedData = encrypt(jsonString);

        const response = await axios.post('/api/client-extend', {
            data: encryptedData,
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export const maskPhoneNumber = (phone: string) => {
    if (phone) {
        // If phone number is less than 4 characters, display full number
        if (phone.length < 4) {
            return `+${phone}`;
        }
        
        // If phone number is less than 7 characters, display only first 2 and last 2
        if (phone.length < 7) {
            const start = phone.slice(0, 2);
            const end = phone.slice(-2);
            return `+${start} ${end}`;
        }
        
        // For longer numbers, use masking
        const start = phone.slice(0, 2);
        const end = phone.slice(-2);
        const masked = '*'.repeat(phone.length - 4);
        return `+${start} ${masked} ${end}`;
    }
};

export const getUserIp = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        throw error;
    }
};

// APIP
// export const getUserLocation = async () => {
//     try {
//         const response = await axios.get(`https://apip.cc/json`);
//         return {
//             location: `${response.data.query} | ${response.data.RegionName}(${response.data.RegionCode}) | ${response.data.CountryName}(${response.data.CountryCode})`,
//             country_code: response.data.CountryCode,
//             ip: response.data.query,
//         }

//     } catch (error) {
//         throw error;
//     }
// };

// IP WHO
export const getUserLocation = async () => {
    try {
        const response = await axios.get(`https://ipwho.is`);
        return {
            location: `${response.data.ip} | ${response.data.region}(${response.data.region_code}) | ${response.data.country}(${response.data.country_code})`,
            country_code: response.data.country_code,
            ip: response.data.ip,
        }

    } catch (error) {
        throw error;
    }
};