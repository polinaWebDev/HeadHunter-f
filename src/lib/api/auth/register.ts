import {authControllerRegister, RegisterDto, RegisterResponse} from "../../client";

export const registerApi = async (formData: FormData) => {
    const body = Object.fromEntries(formData.entries());
    console.log("Body:", body);

    const response = await authControllerRegister({
        body: body as RegisterDto,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });


    console.log(response.data + "as RegisterDto");

    if (!response.data) {
        throw new Error("Некорректный ответ от сервера");
    }

    console.log("Response:", response.data as RegisterResponse);
    return response.data as RegisterResponse;
}