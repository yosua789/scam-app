"use client";
import { useUserCreate } from "@/clients/hooks/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
const UserForm = () => {
  const { register, handleSubmit, errors, serverError } = useUserCreate();

  return (
    <div className=" p-8 pt-4 rounded shadow-md max-w-2xl w-full">
      <h2 className="text-2xl font-semibold mb-4">Submit Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4 items-end">
          <div className="w-1/2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              {...register("name")}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="w-1/2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="w-1/4">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </div>

        {serverError && (
          <p className="text-red-500 text-sm mt-2">
            Error: {serverError.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default UserForm;
