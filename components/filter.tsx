
import { Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import React from 'react'

export interface Ilist {
    id: number,
    descriptions: string
}

export const listFrameword: Ilist[] = [
  {
    id: -1,
    descriptions: 'Selects...'
  },
  {
    id: 1,
    descriptions: 'React'
  },
  {
    id: 2,
    descriptions: 'Angular'
  },
  {
    id: 3,
    descriptions: 'Vuejs'
  }
]

const Filter = () => {
  const [dataForm, setDataForm] = React.useState<{
        dateFrom: Date | null,
        dateTo: Date | null,
        selected: string | number
    }>({
      dateFrom: new Date(),
      dateTo: new Date(),
      selected: -1
    })

  const handleFiler = () => alert(JSON.stringify(dataForm))

  return (
    <div>
      <Card elevation={1}>
        {/** <div>{JSON.stringify(dataForm)}</div> */}
        <CardContent>
          <div className='text-start'>
            <h1>Date Picker</h1>
          </div>

          <Grid direction='row' container spacing={2} my={2.5}>
            <Grid item xs={12} sm={12} xl={3} lg={3}>
              <DatePicker
                disableFuture
                label='Date From'
                value={dataForm.dateFrom}
                onChange={(newValue) => {
                  setDataForm({ ...dataForm, dateFrom: newValue })
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={12} xl={3} lg={3}>
              <DatePicker
                disableFuture
                label='Date To'
                minDate={dataForm.dateFrom}
                value={dataForm.dateTo}
                onChange={(newValue) => {
                  setDataForm({ ...dataForm, dateTo: newValue })
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={12} xl={3} lg={3}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Frameword</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={dataForm.selected}
                  label='Frameword'
                  onChange={(e) => setDataForm({ ...dataForm, selected: e.target.value })}
                >
                  {listFrameword.map((r) => (
                    <MenuItem value={r.id} key={r.id + 1}>{r.descriptions}</MenuItem>
                  ))}

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} xl={3} lg={3}>
              <Button
                variant='contained'
                fullWidth
                onClick={handleFiler}
              >
                Filter
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} xl={12} lg={12} sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
              <h4>{dayjs(dataForm.dateFrom).format('DD/MM/YYYY')}</h4>
              <h4>{dayjs(dataForm.dateTo).format('DD/MM/YYYY')}</h4>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

    </div>
  )
}

export default Filter
