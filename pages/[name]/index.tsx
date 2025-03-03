import { PokemonImage } from '@/components/PokemonImage'
import { pokemonDetails } from '@/redux/service/pokemonService'
import { wrapper } from '@/redux/store'
import { PokemonDetailsState } from '@/redux/types'
import { Box, Breadcrumbs, Grid2, LinearProgress, Link, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next/types'
import React from 'react'
import Route from 'next/link'

// file Props
type Props = {
  res: PokemonDetailsState
}

// Pokemon details
const PokemonName = (props: Props) => {

  const router = useRouter()
  const { name } = router.query
  const { res } = props
  const { data } = res

  return (
    <Box p={3}>
      {/* Breadcrume  */}
      <Breadcrumbs>
        <Link component={Route} underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Typography color="text.primary" textTransform={'capitalize'}>{name}</Typography>
      </Breadcrumbs>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 3
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: 400
        }}>
          {/* Image rendering  */}
          <PokemonImage image={data.sprites.other['official-artwork'].front_default} name={name as string} />

          {/* Details   */}
          <Typography textAlign={'center'}>Weight: {data.weight}</Typography>

          {/* Pokemon stats   */}
          <Grid2 container spacing={2} mt={3}>
            {data.stats.map((item, i: number) => (
              <>
                <Grid2 size={{ xs: 12, sm: 6 }} key={i}>
                  <Typography variant='inherit' textTransform={'capitalize'}>{item.stat.name}: {item.base_stat}</Typography>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }} key={i}>
                  <LinearProgress variant="buffer" value={item.base_stat} sx={{ borderRadius: 5 }} />
                </Grid2>
              </>
            ))}

          </Grid2>

        </Box>
      </Box>
    </Box>
  )
}

export default PokemonName


//from server
PokemonName.getInitialProps = wrapper.getInitialPageProps((store) => async (ctx: NextPageContext) => {

  await store.dispatch(pokemonDetails(ctx.query.name as string));

  const res = store.getState().pokemon.pokemonDetails

  return {
    res,
  }
});