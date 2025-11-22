
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const auth = {
    SIGN_UP_API: BASE_URL + "/user/sign-up",
    UNIQUE_USERNAME_API: BASE_URL + "/user/unique-username",
    SEND_OTP_API: BASE_URL + "/user/otp-send",
    VERIFY_API: BASE_URL + "/user/verify-otp",
    SIGN_IN_API: BASE_URL + "/user/sign-in",
    LOGOUT_API: BASE_URL + "/user/logout"
}


export const recipe = {
    GENERATE_RECIPE_API: BASE_URL + "/recipe/generate-recipe",
    RECIPE_SUMMARY_API: BASE_URL + "/recipe/recipe-details",
    SAVE_RECIPE_API: BASE_URL + "/recipe/save-recipe",
    DELETE_RECIPE_API: BASE_URL + "/recipe/delete-recipe"
}


export const nutrition = {
    LOG_RECIPE_NUTRITION_API: BASE_URL + "/nutrition/recipe-nutrition",
    LOG_MANUAL_NUTRITION_API: BASE_URL + "/nutrition/manual-nutrition"
}


export const getData = {
    USER_DETAILS_API: BASE_URL + "/data/user-details",
    RECENT_RECIPE_API: BASE_URL + "/data/get-recent-recipe"
}

export const userProfile = {
    UPDATE_PERSONAL_DETAILS_API: BASE_URL + "/profile/update-details",
    UPDATE_PROFILE_IMAGE_API: BASE_URL + "/profile/update-profilePic",
    DELETE_USER_API: BASE_URL + "/profile/delete-user"
}

export const chatbot = {
    GET_MESSAGE_RESPONSE_API: BASE_URL + "/chatbot/chatbot-reply"
}