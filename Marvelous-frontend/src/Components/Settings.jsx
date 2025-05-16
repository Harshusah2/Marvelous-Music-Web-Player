import React from 'react';

const SettingsPage = () => {
  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <div className="max-w-3xl w-full shadow-md rounded-lg">
        <div className="border-b p-6">
          <h1 className="text-2xl font-semibold">Account Settings</h1>
          <p className="text-gray-500">Manage your profile, preferences, and account details</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Settings */}
          <section>
            <h2 className="text-lg font-semibold">Profile</h2>
            <div className="space-y-4 mt-4">
              <div className="flex flex-col">
                <label className="text-gray-500">Username</label>
                <input
                  type="text"
                  className="w-full text-gray-700 p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="Username"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-500">Email</label>
                <input
                  type="email"
                  className="w-full text-gray-700 p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                  placeholder="Email"
                />
              </div>
            </div>
          </section>

          {/* Subscription Settings */}
          <section>
            <h2 className="text-lg font-semibold">Subscription</h2>
            <div className="space-y-4 mt-4">
              <p className="text-gray-500">Your current plan: <span className="text-indigo-600 font-medium">Premium</span></p>
              <button className="text-indigo-600 hover:underline">Manage subscription</button>
            </div>
          </section>

          {/* Privacy Settings */}
          <section>
            <h2 className="text-lg font-semibold">Privacy</h2>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Allow personalized recommendations</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Make my profile public</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </section>

          {/* Notifications Settings */}
          <section>
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Email Notifications</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Push Notifications</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="pt-4">
            <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
