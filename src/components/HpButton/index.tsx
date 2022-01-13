import { Button, ButtonProps } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/styles';
import { FC, useMemo } from 'react';

const stylePurpleButton = {
  root: {},
  textPrimary: {
    backgroundColor: 'var(--button-background-color)',
    color: 'var(--color-white)',
    '&:hover': {
      backgroundColor: 'var(--button-background-color)',
      filter: 'brightness(1.1)',
    },
  },
}

const HOButton: FC<WithStyles<typeof stylePurpleButton> & ButtonProps> = ({ children, classes, ...rest }) => {
  const className = useMemo(() => {
    return Object.keys(classes).map(key => classes[key]).join(' ')
  }, [classes])

  return <Button className={className} {...rest}>{children}</Button>
}

export const HpButton = withStyles(stylePurpleButton)(HOButton)