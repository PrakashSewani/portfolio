"use client";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { LayoutProvider, useLayout } from "../context";

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { currentPage, handleNavigate } = useLayout();

    const navItems = [
        { label: "Home", id: "home" },
        { label: "Projects", id: "projects" },
        { label: "About", id: "about" },
        { label: "Contact", id: "contact" },
    ];

    return (
        <Stack w={"dvw"} h={"dvh"}>
            <Flex
                as="nav"
                p={4}
                justifyContent={"space-between"}
                alignItems={"center"}
                borderBottomWidth="1px"
                borderColor="gray.200"
            >
                <Box>
                    <Text
                        colorPalette={"purple"}
                        textStyle={"2xl"}
                        fontWeight="bold"
                    >
                        Prakash Sewani
                    </Text>
                </Box>
                <Flex gap={2}>
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            disabled={currentPage === item.id}
                            colorPalette={"purple"}
                            rounded={"md"}
                            variant={currentPage === item.id ? "solid" : "ghost"}
                            onClick={() => handleNavigate(item.id)}
                            _hover={{
                                bg: currentPage === item.id ? undefined : "purple.50",
                                transition: "all 0.2s",
                            }}
                            _disabled={{
                                opacity: 1,
                            }}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Flex>
            </Flex>
            <Box flex={1} p={4} overflowY="auto">
                {children}
            </Box>
        </Stack>
    );
};