import React from 'react'

import { SpinnerContainer, SpinnerOverlay } from './width.spinner.styles';

const WidthSpinner = WrappedComponent => {
    const Spinner = ({ isLoading, ...otherProps}) => {
        return isLoading ? (
            <SpinnerOverlay>
              <SpinnerContainer />
            </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps}/>
        )
    };
return Spinner;
} 

export default WidthSpinner;