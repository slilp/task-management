import React from "react";

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
  error?: string;
}

function TextField({ error, ...props }: TextFieldProps) {
  return (
    <>
      <input
        className="rounded-lg w-full p-3 border-2 focus:outline-none focus:border-purple-500"
        data-testid={`textfield-${props.id}-input`}
        {...props}
      />
      {error && (
        <p
          className="mt-1 text-red-600 text-sm"
          data-testid={`textfield-${props.id}-error-message`}
        >
          {error}
        </p>
      )}
    </>
  );
}

export default TextField;
