import { motion } from "framer-motion";
import { User } from "lucide-react";

const UsersList = ({ users }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <User className="w-6 h-6 text-indigo-500" />
        Users List
      </h3>
      <ul className="space-y-3">
        {users.map((user, index) => (
          <motion.li
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-200 
                       hover:shadow-md hover:border-indigo-300 transition duration-300 bg-gray-50"
          >
            <div>
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600">
              Active
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
