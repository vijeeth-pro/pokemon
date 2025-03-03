import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export function PokemonImage({ image, name }: { image: string, name: string }) {

    const [loader, setLoader] = useState(true);

    return (
        <Box>
            <Image
                src={image}
                priority
                alt={"Picture of " + name}
                layout="responsive"
                objectFit="cover"
                loader={() => loader ? 'https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif' : image}
                height={100}
                width={100}
                onLoadingComplete={() => setLoader(false)}
            />
        </Box>
    )
}
