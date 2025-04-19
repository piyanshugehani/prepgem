import LineChart from "../../components/LineChart";
import Header from "../dashboard/_components/Header";

export default function Dashboard() {
    // useEffect(() => {
    //     dashboardAnalitics();
    // }, []);
    
    // Generate sample contribution data for the heatmap
    const generateContributionData = () => {
        const data = [];
        for (let i = 0; i < 7; i++) {
            const row = [];
            for (let j = 0; j < 12; j++) {
                row.push(Math.floor(Math.random() * 4)); // 0-3 for different intensity levels
            }
            data.push(row);
        }
        return data;
    };
    
    const contributionData = generateContributionData();
    
    return (
        <div>
            <Header />
            <div className="container p-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-lg shadow h-full">
                        <div className="flex flex-col sm:flex-row">
                            <div className="sm:w-7/12">
                                <div className="p-6">
                                    <h5 className="text-primary text-4xl font-extrabold mb-3">
                                        Welcome back, Ananya! 🎓
                                    </h5>
                                    <p className="mb-4">
                                        You've positively impacted <span className="font-medium">127</span> students
                                        this month. Your next session is in 2 hours.
                                    </p>
                                    <a href="#" className="text-sm border border-primary text-primary px-3 py-1 rounded-md hover:bg-primary hover:text-white transition-colors">
                                        Join Next Session
                                    </a>
                                </div>
                            </div>
                            <div className="sm:w-5/12 text-center sm:text-left">
                                <div className="pb-0 px-0 sm:px-4">
                                    <img
                                        src="./assets/img/iconnnnnn.jpg"
                                        className="h-72 w-72 sm:w-96"
                                        alt="Volunteer Teacher"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contribution Heatmap */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-lg shadow h-full">
                        <div className="p-4">
                            <h5 className="font-medium text-lg mb-3">Your Teaching Streak</h5>
                            <div className="contribution-heatmap">
                                {contributionData.map((row, i) => (
                                    <div key={i} className="flex gap-1 mb-1">
                                        {row.map((value, j) => (
                                            <div
                                                key={j}
                                                className="contribution-box"
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    backgroundColor: `rgba(40, 167, 69, ${value * 0.25})`,
                                                    borderRadius: '2px'
                                                }}
                                                title={`${value} contributions`}
                                            ></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <p className="mt-2 mb-0 text-gray-500 text-sm">
                                Based on your teaching activity in the last 12 weeks
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Second Row: Upcoming Sessions + Stats Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
                {/* Upcoming Sessions */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-3 border-b">
                            <h5 className="font-medium text-lg m-0">Upcoming Sessions</h5>
                            <button className="bg-primary text-white px-3 py-1 text-sm rounded hover:bg-primary-dark transition-colors">Schedule New</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Date</th>
                                        <th className="py-2 text-left">Time</th>
                                        <th className="py-2 text-left">Topic</th>
                                        <th className="py-2 text-left">Students</th>
                                        <th className="px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-3 border-t">Today</td>
                                        <td className="py-3 border-t">14:00</td>
                                        <td className="py-3 border-t">Mathematics - Algebra</td>
                                        <td className="py-3 border-t">15</td>
                                        <td className="px-4 py-3 border-t">
                                            <button className="bg-primary text-white px-3 py-1 text-sm rounded hover:bg-primary-dark transition-colors">Join</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Key Stats Cards */}
                <div className="lg:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <div>
                            <div className="bg-white rounded-lg shadow h-full">
                                <div className="p-3">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-shrink-0">
                                            <img
                                                src="https://cdn-icons-png.freepik.com/512/7128/7128192.png"
                                                alt="Sessions"
                                                className="rounded w-10"
                                            />
                                        </div>
                                    </div>
                                    <span className="font-medium block mb-1">Total Sessions</span>
                                    <h3 className="text-2xl font-semibold mb-2">48</h3>
                                    <small className="text-green-500 font-medium flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        +12 this month
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white rounded-lg shadow h-full">
                                <div className="p-3">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-shrink-0">
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFY4SKapLBdbW38LLrQOEn7QhCdgNS_ilcag&s"
                                                alt="Students"
                                                className="rounded w-10"
                                            />
                                        </div>
                                    </div>
                                    <span className="font-medium block mb-1">Students Impacted</span>
                                    <h3 className="text-2xl font-semibold mb-2">127</h3>
                                    <small className="text-green-500 font-medium flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        +28 new students
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Row: Bottom section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
                {/* Student Progress */}
                <div className="md:col-span-8">
                    <div className="bg-white rounded-lg shadow h-full">
                        <LineChart />
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="md:col-span-4">
                    <div className="bg-white rounded-lg shadow h-full">
                        <div className="p-3 border-b">
                            <h5 className="font-medium text-lg m-0">Recent Activities</h5>
                        </div>
                        <div className="p-4">
                            <ul className="space-y-4">
                                <li className="relative pl-6 pb-4 border-l border-gray-200">
                                    <span className="absolute left-0 -translate-x-1/2 w-2 h-2 bg-primary rounded-full translate-y-1"></span>
                                    <div>
                                        <div className="mb-1 flex justify-between">
                                            <h6 className="font-medium">Mathematics Session Completed</h6>
                                            <small className="text-gray-500">2 hours ago</small>
                                        </div>
                                        <p className="mb-0 text-gray-600">15 students attended</p>
                                    </div>
                                </li>
                                <li className="relative pl-6 border-l border-gray-200">
                                    <span className="absolute left-0 -translate-x-1/2 w-2 h-2 bg-primary rounded-full translate-y-1"></span>
                                    <div>
                                        <div className="mb-1 flex justify-between">
                                            <h6 className="font-medium">New Student Query</h6>
                                            <small className="text-gray-500">5 hours ago</small>
                                        </div>
                                        <p className="mb-0 text-gray-600">Query about Algebra homework</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    );
}