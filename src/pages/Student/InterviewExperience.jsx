import { Briefcase, Star } from "lucide-react"; // optional icons

const InterviewExperience = () => {
  const experiences = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer Intern",
      content:
        "The process included an online assessment followed by two rounds focused on DSA and system design. Interviewers were supportive.",
      color: "bg-gradient-to-r from-yellow-400 to-pink-500",
    },
    {
      id: 2,
      company: "TCS",
      role: "Graduate Trainee",
      content:
        "Aptitude + technical round with Java and SQL. HR tested communication skills and teamwork scenarios.",
      color: "bg-gradient-to-r from-green-400 to-blue-500",
    },
    {
      id: 3,
      company: "Infosys",
      role: "System Engineer",
      content:
        "Online test included verbal and aptitude. Interview revolved around my final year project and basic coding.",
      color: "bg-gradient-to-r from-purple-400 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 text-center shadow-lg">
        <h1 className="text-4xl font-bold mb-2">🚀 Interview Experiences</h1>
        <p className="text-lg max-w-xl mx-auto">
          Explore real stories from candidates and learn how they cracked
          technical & HR rounds at top companies.
        </p>
      </div>

      {/* Experience Cards */}
      <div className="max-w-5xl mx-auto py-10 px-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className={`rounded-xl text-white p-5 shadow-lg transform hover:scale-105 transition duration-300 ${exp.color}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-block bg-white text-gray-800 text-sm px-3 py-1 rounded-full font-semibold">
                {exp.company}
              </span>
              <Star size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold mb-2">{exp.role}</h2>
            <p className="text-sm">{exp.content}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center py-12 bg-white shadow-inner">
        <h3 className="text-2xl font-semibold mb-4">
          🎯 Want to help others succeed?
        </h3>
        <p className="mb-6 text-gray-700">
          Share your interview story and inspire future candidates!
        </p>
        <button className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition duration-300 animate-bounce">
          Share Your Experience
        </button>
      </div>
    </div>
  );
};

export default InterviewExperience;
