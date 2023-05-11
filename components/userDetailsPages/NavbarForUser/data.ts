interface Router {
    desc: string;
    href: string;
}

export const RoutingArrayLoggedUser: Router[] = [
    {
        desc: "Profil Użytkownika",
        href: "/userDetails",
    },
    {
        desc: "Stworzone Posty",
        href: "/userDetails/userProfile",
    },
    {
        desc: "Stworzone Komentarze",
        href: "/userDetails/userComments",
    },
    {
        desc: "Polikowane Posty",
        href: "/userDetails/userLikedPosts",
    },
    {
        desc: "Polikowane Komentarze",
        href: "/userDetails/userLikedComments",
    },
];

export const RoutingArrayOtherUser = (userMail: string) => {
    return [
        {
            desc: "Profil Użytkownika",
            href: `/userDetails/${userMail}`,
        },
        {
            desc: "Stworzone Posty",
            href: `/userDetails/${userMail}/userProfile`,
        },
        {
            desc: "Stworzone Komentarze",
            href: `/userDetails/${userMail}/userComments`,
        },
        {
            desc: "Polikowane Posty",
            href: `/userDetails/${userMail}/userLikedPosts`,
        },
        {
            desc: "Polikowane Komentarze",
            href: `/userDetails/${userMail}/userLikedComments`,
        },
    ]
}