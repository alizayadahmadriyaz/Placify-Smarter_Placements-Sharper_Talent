import { useState } from "react";
import { Switch } from "@headlessui/react";
import { Bell, BellOff, Trash2, LogOut } from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* <h1 className="text-4xl font-bold mb-8">Settings</h1> */}

        {/* Profile Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                placeholder="john@example.com"
              />
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Preferences</h2>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-base font-medium">App Theme</span>
            <ThemeToggle />
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-base">
              {notifications ? <Bell size={20} /> : <BellOff size={20} />}
              {notifications ? "Notifications On" : "Notifications Off"}
            </span>
            <Switch
              checked={notifications}
              onChange={setNotifications}
              className={`${
                notifications ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  notifications ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-red-500">Danger Zone</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full sm:w-auto">
              <Trash2 size={18} />
              Delete Account
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition w-full sm:w-auto">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
