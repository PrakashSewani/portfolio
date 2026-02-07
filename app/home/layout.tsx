"use client";
import { Stack, Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import StaggeredMenu from "@/components/react-bits/staggered-menu/StaggeredMenu";
import logo from "./logo.svg"

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    const menuItems = [
        { label: 'Home', ariaLabel: 'Go to home page', link: '/home' },
        { label: 'Projects', ariaLabel: 'Learn about projects', link: '/home/projects' },
        { label: 'Hobbies', ariaLabel: 'View my hobbies', link: '/home/hobbies' },
        { label: 'Contact', ariaLabel: 'Get in touch', link: '/home/contact' }
    ];

    const socialItems = [
        { label: 'Twitter', link: 'https://twitter.com' },
        { label: 'GitHub', link: 'https://github.com' },
        { label: 'LinkedIn', link: 'https://linkedin.com' }
    ];

    return (
        <Box overflow={"auto"}>
            <StaggeredMenu
                position="right"
                items={menuItems}
                socialItems={socialItems}
                displaySocials
                displayItemNumbering={true}
                menuButtonColor="#ffffff"
                openMenuButtonColor="black"
                changeMenuColorOnOpen={true}
                colors={['#B19EEF', 'purple']}
                logoUrl={logo.src}
                accentColor="purple"
            />
            <Stack flex={1} overflowY="auto" p={4}>
                {children}
            </Stack>
        </Box>
    );
};