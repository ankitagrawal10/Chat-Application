import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Resetpage() {
  const [otpsent, setotpsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Form data:", data); // Add this line for debugging

    if (!otpsent) {
      try {
        const info = { email: data.email };
        const response = await axios.post(
          "http://localhost:3000/user/reset",
          info,
          { withCredentials: true }
        );

        if (response.status === 200) {
          toast.success("OTP sent successfully");
          setotpsent(true);
          setEmail(data.email);
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to send OTP");
      } finally {
        setLoading(false);
      }
    } else if (!verified) {
      try {
        const info = { otp: data.otp };
        const response = await axios.post(
          "http://localhost:3000/user/verifyfortest",
          info,
          { withCredentials: true }
        );

        if (response.status === 200) {
          toast.success("Verified successfully");
          setVerified(true);
        } else {
          console.log("Verification response:", response);
        }
      } catch (error) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        toast.error("Invalid OTP");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const info = {
          email,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        };
        console.log("Sending reset password request with info:", info); // Debugging info
        const response = await axios.post(
          "http://localhost:3000/user/resetPassword",
          info,
          { withCredentials: true }
        );

        if (response.status === 200) {
          toast.success("Password reset successfully");
          navigate("/login");
        }
      } catch (error) {
        console.log(error.message);
        console.log(error.response.data); // More detailed error message
        toast.error("Failed to reset password");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-white px-6 py-2 rounded-md space-y-3 w-96"
      >
        <h1 className="text-2xl text-center">
          Text <span className="text-green-500 font-semibold">App</span>
        </h1>
        <h2 className="text-xl text-white font-bold">Reset Password</h2>
        <br />

        {!otpsent ? (
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
          </label>
        ) : verified ? (
          <>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="New Password"
                {...register("newPassword", {
                  required: "New Password is required",
                })}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
              />
            </label>
          </>
        ) : (
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 1 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Enter the OTP"
              {...register("otp", { required: "OTP is required" })}
            />
          </label>
        )}

        <div>
          <button
            type="submit"
            className={`text-white bg-green-500 px-4 py-1 rounded-lg w-full mt-4 mb-4 ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : verified
              ? "Reset Password"
              : otpsent
              ? "Verify OTP"
              : "Send OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Resetpage;
