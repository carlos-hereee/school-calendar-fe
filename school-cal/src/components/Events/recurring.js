import React, { useState } from "react"
import { Formik, Field, setNestedObjectValues } from "formik"

import { RRule, RRuleSet, rrulestr } from "rrule"

import {
  Checkbox,
  FormControlLabel,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@material-ui/core"
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers"

const Reccuring = ({ values }) => {
  const [isReOccurring, setIsReOccurring] = useState(true)
  const [intervalVal, setIntervalVal] = useState("")
  const [intervalType, setIntervalType] = useState("")

  const [days, setDays] = useState({
    SU: false,
    TU: false,
    WE: false,
    TH: false,
    FR: false,
    SA: false,
  })
  const [months, setMonths] = useState({
    jan: false,
    feb: false,
    mar: false,
    apr: false,
    may: false,
    jun: false,
    jul: false,
    aug: false,
    sep: false,
    oct: false,
    nov: false,
    dec: false,
  })
  const daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Webnesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const monthsList = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // const handleCheckBoxChange = (name, type) => event => {
  //   setNestedObjectValues({ ...`${type}`, [name]: event.target.checked })
  // }

  const handleDayChange = name => event => {
    setDays({ ...days, [name]: event.target.checked })
    console.log(Object.keys(days).filter(key => days[key] === true))
    console.log("days", days)
  }

  const handleMonthChange = name => event => {
    setMonths({ ...months, [name]: event.target.checked })
    console.log(Object.keys(months).filter(key => days[key] === true))
    console.log("months", months)
  }

  const handleIntervalChange = event => {
    setIntervalVal(event.target.value)
    console.log("intervalVal", intervalVal)
  }

  const handleIntervalTypeChange = event => {
    setIntervalType(event.target.value)
    console.log("intervalType", intervalType)
  }
  const rule = new RRule({
    freq: RRule.intervalType,
    interval: RRule.setIntervalVal,
    // byweekday: RRule.Object.keys(days).filter(key => days[key] === true),
    // byweekday: [JSON.parse(RRule.Object.keys(days).filter(key => days[key] === true))],
    // byweekday: [RRule.JSON.parse(Object.keys(days).filter(key => days[key] === true))],
    // dtstart: values.startDate,
    // until: values.endDate,
    wkst: RRule.SU,
  })
  // values.startDate = moment(values.startDate).format("YYYY-MM-DD")
  // values.endDate = moment(values.endDate).format("YYYY-MM-DD")

  return (
    <>
      <Grid>
        <Grid item xs={12}>
          <form>
            <FormControlLabel
              value="reoccuring"
              control={
                <Switch
                  color="primary"
                  checked={values.isReOccurring}
                  onChange={() => setIsReOccurring(!isReOccurring)}
                />
              }
              label="Reoccuring Event"
              labelPlacement="end"
            />
          </form>
        </Grid>
        {isReOccurring && (
          <Grid>
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
              }}>
              <h1>Start</h1>
              <form>
                <FormControl>
                  <Field name="startDate">{/* <DatePickerField /> */}</Field>
                </FormControl>
              </form>
            </Grid>
            {/* add && intervalCount > 0 */}
            {/* change month to months when intervalCount > 0 */}
            {intervalType === "WEEKLY" && (
              <Grid item xs={16}>
                <FormLabel component="legend">Days</FormLabel>
                <FormGroup row>
                  {daysList.map((item, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            onChange={handleDayChange(item)}
                            value={item}
                          />
                        }
                        label={item}
                      />
                    )
                  })}
                </FormGroup>
              </Grid>
            )}
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={3} style={{ textAlign: "start" }}>
                  {/* <Typography variant="h6">repeat every</Typography> */}
                  <FormLabel label="repeat every">Repeat Every</FormLabel>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="standard-basic"
                    label="count"
                    size="small"
                    type="number"
                    defaultValue="1"
                    // onChange={handleIntervalChange(event)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Select
                    value={intervalType}
                    onChange={handleIntervalTypeChange}>
                    <MenuItem value={"DAILY"}>days</MenuItem>
                    <MenuItem value={"WEEKLY"}>weeks</MenuItem>
                    <MenuItem value={"MONTHLY"}>months</MenuItem>
                    <MenuItem value={"YEARLY"}>year(s)</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={11}>
              <FormLabel component="legend">Months</FormLabel>
              <FormGroup row>
                {monthsList.map((item, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          onChange={handleMonthChange(item)}
                          value={item}
                        />
                      }
                      label={item}
                    />
                  )
                })}
              </FormGroup>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  )
}
const DatePickerField = ({ field, form }) => {
  return (
    <DatePicker
      clearable
      value={field.value}
      name={field.name}
      format="MM/DD/YYYY"
      onChange={selectedDate =>
        form.setFieldValue(field.name, selectedDate, false)
      }
    />
  )
}
export default Reccuring
