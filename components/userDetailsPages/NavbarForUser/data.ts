interface Router {
    desc: string;
    href: string;
}

export const RoutingArray: Router[] = [
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