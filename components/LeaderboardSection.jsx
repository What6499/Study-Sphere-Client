import { Link } from "react-router";
import { Trophy } from "lucide-react";

const LeaderboardSection = () => {
  return (
    <section className="py-36 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-100 dark:bg-emerald-900/20 p-4 rounded-full">
              <Trophy className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>

          <h2 className="text-5xl font-bold text-gray-900 dark:text-white">
            StudySphere Leaderboard
          </h2>

          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>

          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            See who tops the ranks by maintaining the highest average marks
            across all assignments. Compete with your peers and strive to be the
            best in our learning community!
          </p>

          <div className="pt-4">
            <Link
              to="/leaderboard"
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Trophy className="w-5 h-5" />
              View Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
