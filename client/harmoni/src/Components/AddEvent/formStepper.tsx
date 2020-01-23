/**
 * Stepper component to display several components in a single page with page selectors.
 * Intended to use with forms.
 */

import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

// Style for stepper, used in material UI component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    button: {
      margin: theme.spacing(1),
      marginLeft: 0
    },
    backButton: {
      marginRight: theme.spacing(1)
    },
    completed: {
      display: "inline-block"
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

interface IProps {
  steps: Array<string>;
  activeStep: number;
  completed: Set<number>;
  skipped: Set<number>;
  handleStep: Function;
  loading: boolean;
  uploaded: boolean;
}

const FormStepper = (props: IProps) => {
  const classes = useStyles({});

  // Check if any steps is skipped
  const isStepSkipped = (step: number) => {
    return props.skipped.has(step);
  };

  // Check if all steps are completed
  const isStepComplete = (step: number) => {
    return props.completed.has(step);
  };

  return (
    <Stepper
      className={classes.root}
      alternativeLabel
      nonLinear
      activeStep={props.activeStep}
    >
      {props.steps.map((label, index) => {
        const stepProps: { completed?: boolean } = {};
        const buttonProps: { optional?: React.ReactNode } = {};

        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }

        return (
          <Step
            key={label}
            {...stepProps}
            disabled={props.loading || props.uploaded}
          >
            <StepButton
              onClick={props.handleStep(index)}
              completed={isStepComplete(index)}
              {...buttonProps}
            >
              {label}
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default FormStepper;
