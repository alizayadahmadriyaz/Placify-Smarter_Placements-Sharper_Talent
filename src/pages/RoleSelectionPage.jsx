import { useNavigate } from 'react-router-dom';
import { GraduationCap, School, Briefcase, Building } from 'lucide-react';
import {motion} from 'framer-motion';
const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const roles = [
    { 
      title: 'Student',
      icon: <GraduationCap className="w-8 h-8" />,
      route: '/register/student'
    },
    {
      title: 'Institution',
      icon: <School className="w-8 h-8" />,
      route: '/register/institution'
    },
    {
      title: 'Employee',
      icon: <Briefcase className="w-8 h-8" />,
      route: '/register/employee'
    },
    {
      title: 'Company',
      icon: <Building className="w-8 h-8" />,
      route: '/register/company'
    }
  ];

  return (
<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.h1 
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Create Your Account
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              onClick={() => navigate(role.route)}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4 + (index * 0.1),
                ease: "easeOut" 
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="p-3 bg-purple-100 rounded-full mb-4 text-purple-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.6 + (index * 0.1),
                  type: "spring",
                  stiffness: 200
                }}
              >
                {role.icon}
              </motion.div>
              <motion.h2 
                className="text-xl font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.8 + (index * 0.1)
                }}
              >
                {role.title}
              </motion.h2>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;