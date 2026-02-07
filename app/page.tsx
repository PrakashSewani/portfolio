"use client";
import { Flex, ProgressCircle } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loadingValue, setLoadingValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (loadingValue === 100) {
      setTimeout(() => {
        router.push("/home");
      }, 500);
    };
  }, [loadingValue]);

  return (
    <Flex
      w={"dvw"}
      h={"dvh"}
      justify={"center"}
      align={"center"}
    >
      <ProgressCircle.Root
        size="md"
        value={loadingValue}
        colorPalette={"purple"}
      >
        <ProgressCircle.Circle>
          <ProgressCircle.Track />
          <ProgressCircle.Range
            strokeLinecap="round"
          />
        </ProgressCircle.Circle>
      </ProgressCircle.Root>
    </Flex>
  );
};
