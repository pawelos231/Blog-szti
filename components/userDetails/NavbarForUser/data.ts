interface Router {
    desc: string;
    href: string;
}

export const RoutingArray: Router[] = [
    {
        desc: "Główna Posty",
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