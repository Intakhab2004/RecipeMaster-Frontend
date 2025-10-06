import z from "zod"


export const verifySchema = z.object({
    otpCode: z.string()
                      .length(6, "OTP must be of 6 digits")
})