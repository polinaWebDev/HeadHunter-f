import {useUserProfile} from "../../../viewmodels/useGetProfile.ts";

export const ProfileScreen = () => {
    const { data: user, isLoading, error } = useUserProfile();


    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка загрузки</p>;
    if (!user) return <p>Профиль не найден</p>;

    console.log(useUserProfile);

    return (
        <div className="profile-card">
            <img src={user.avatar_url || "/default-avatar.png"} alt="Avatar" className="avatar" />
            <h2>{user.firstName} {user.lastname}</h2>
            <p>Email: {user.email}</p>
            <p>Тип профиля: {user.profileType === "employer" ? "Работодатель" : "Соискатель"}</p>
        </div>
    );
};