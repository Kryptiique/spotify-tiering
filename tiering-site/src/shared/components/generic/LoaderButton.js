import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "../../styles/LoaderButton.css";

/**
 * This component takes an isLoading flag and the text that the 
 * button displays in the two states (the default state and the 
 * loading state). The disabled prop is a result of what we have 
 * currently in the Login button. We ensure that the button is 
 * disabled when isLoading is true. This makes it so that the user 
 * can’t click it while we are in the process of logging them in.
 * @since 0.3.1
 */
export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) =>
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>;

