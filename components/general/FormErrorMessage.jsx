import React from "react";

const FormErrorMessage = ({ children }) => {
	return <p className="text-sm text-red-600">{children}</p>;
};

export default FormErrorMessage;
