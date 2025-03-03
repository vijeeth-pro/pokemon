import { pokemonList } from '@/redux/service/pokemonService'
import { useAppDispatch, wrapper } from '@/redux/store'
import { PokemonList, PokemonListState } from '@/redux/types'
import { Box, IconButton, Typography } from '@mui/material'
import { DataGrid, GridCallbackDetails, GridColDef, GridPaginationModel, GridRowsProp } from '@mui/x-data-grid'
import Link from 'next/link'
import React, { useState } from 'react'
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import { setQuery } from '@/redux/slice/querySlice'
import { useSelector } from 'react-redux'
import { GetServerSideProps } from 'next'


//adding PokemonListState as a type
type Props = {
  res: PokemonListState
  cookies: {
    limit: number,
    next: number,
  } | null,
}


//table header
const tableHeader: Array<GridColDef> = [
  {
    field: 'id',
    headerName: 'ID',
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center'
  },
  {
    field: 'name',
    headerName: 'Name',
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    flex: 1
  },
  {
    field: 'url',
    headerName: 'API URL',
    width: 400,
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
    flex: 1
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    hideable: false,
    disableColumnMenu: true,
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    renderCell: (params) => {
      return (
        <Box>
          <IconButton component={Link} href={`/${params.row.name}`}  >
            <ArrowCircleRightRoundedIcon />
          </IconButton>
        </Box>
      )
    }
  }
]


//table data
const TableData = (data: Array<PokemonList>) => [...data].map((item: PokemonList) => ({ id: item?.url.split('/').filter(part => part.length > 0).pop(), name: item.name, url: item.url, }))


//client side
const index = (props: Props) => {

  const root = useSelector((state: any) => state.query)

  //dispatch
  const dispatch = useAppDispatch()

  //server side
  const { res, cookies } = props
  const { data, count } = res

  //state
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [tableHeaderData, setTableHeaderData] = useState<GridRowsProp>(TableData(data))

  //pagination
  const handlePagination = async (model: GridPaginationModel, details: GridCallbackDetails<"pagination">) => {
    setIsLoading(true)

    //api call
    const res = await dispatch(pokemonList({ limit: 10, next: model.page }))

    const query = await dispatch(setQuery({ limit: 10, next: model.page }))
    setTableHeaderData(TableData(res.payload.results))

    setIsLoading(false)
  }


  return (
    <Box p={3}>
      {/* Header  */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 3,
        mb: 1
      }}>
        <Typography variant='h6' mt={3}>Pokemon List</Typography>

        {/* Search is not available in api */}
        {/* <FormControl fullWidth variant="standard" sx={{ maxWidth: 300 }}>
          <InputLabel htmlFor="standard-adornment-search">Search</InputLabel>
          <Input
            id="standard-adornment-search"
            endAdornment={<InputAdornment position="end">
              <SearchRoundedIcon />
            </InputAdornment>}
          />
        </FormControl> */}
      </Box>


      {/* Table */}
      <DataGrid
        //row per page is not available in free version library
        loading={isLoading}
        rows={tableHeaderData}
        columns={tableHeader}
        disableColumnMenu
        rowCount={count}
        pagination={true}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
              page: cookies?.next ?? 0,
            },
          },
        }}
        disableRowSelectionOnClick
        paginationMode='server'
        onPaginationModelChange={handlePagination}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        }}

      />

      {/* notes  */}
      <Box>
        <Box component={'dl'}>
          <Box component={'dt'}>Note :</Box>
          <Box component={'dd'}>Row per page is not available in free version library and so pokemon api.</Box>
          <Box component={'dd'}>Search is not available pokemon api.</Box>
        </Box>
      </Box>
    </Box>
  )
}

// Server side
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res }) => {
  // const cookies = getCookies({ req, res })

  const cookie = req?.headers?.cookie
  const query = cookie?.split('=')[1] ?? ''

  const cookieQuery = query ? JSON.parse(decodeURIComponent(query)) : null

  await store.dispatch(pokemonList(cookieQuery ?? { limit: 10, next: 0 }))

  const pokemon = store.getState().pokemon.pokemonList

  return {
    props: {
      res: pokemon,
      cookies: cookieQuery,
    }
  }
})


export default index


