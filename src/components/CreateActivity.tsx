import { useState } from 'react';
import { Button, Grid, Slider, TextField, Typography } from '@mui/material';
import { activityType } from '../constants/activityTypes.const';
import AutocompleteInput from './AutocompleteInput';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ExerciseLevel } from '../enums/exerciseLevels.enum';
import { Activity } from '../interfaces/activity.interface';
import { Option } from '../interfaces/option.interface';

const levelIntensity: Option[] = Object.values(ExerciseLevel).map((level: ExerciseLevel) => ({ label: level } as Option))

function CreateActivity({ date, handleSubmit }: {
  date?: string;
  handleSubmit: (activity: Activity) => void
}) {
  const [activity, setActivity] = useState<Activity>({
    duration: 30,
    type: null,
    level: null,
    addInfo: ''
  });

  const handleChange = (event: Event | React.ChangeEvent): void => {
    console.log(event)
    const { name, value } = event.target as HTMLInputElement;
    setActivity({ ...activity, [name]: value });
  }
  const handleOptionSelect = (key: string, value: string): void => {
    setActivity({ ...activity, [key]: value });
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        New activity for {date}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AutocompleteInput inputLabel={'Choose the activity type'}
                             options={activityType}
                             formName={'type'}
                             handleOptionSelect={handleOptionSelect}/>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography id="input-slider" gutterBottom>
            Duration
          </Typography>
          <Slider
            aria-labelledby="input-slider"
            name="duration"
            value={activity.duration}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={10}
            max={90}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <AutocompleteInput
            inputLabel={'Choose the Intensity'}
            options={levelIntensity}
            formName={'level'}
            handleOptionSelect={handleOptionSelect}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={activity.addInfo}
            id="add-info"
            name="addInfo"
            label="Additional info"
            fullWidth
            autoComplete="add-info"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained"
                  endIcon={<CheckCircleOutlineIcon/>}
                  onClick={() => handleSubmit(activity)}
          >Create</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default CreateActivity;