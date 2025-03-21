import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaWallet, FaUsers, FaBoxOpen, FaTruck } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, ResponsiveContainer } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading, error } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ["order-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/order-stats");
            return res.data;
        },
    });

    if (isLoading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error loading stats.</p>;

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = chartData.map(data => {
        return {
            name: data.category,
            value: data.revenue
        }
    });

    return (
        <div className="mt-10 md:mt-0 md:px-8">
            <h2 className="text-3xl font-semibold mb-8 text-center">
                Hi, Welcome<span className="text-yellow-500"> {user?.displayName || "Back"}</span>!
            </h2>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
                {/* Revenue Card */}
                <div className="rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
                    <FaWallet className="text-4xl text-yellow-500 mb-4" />
                    <h3 className="text-2xl font-bold">${stats?.revenue || 0}</h3>
                    <p className="text-sm text-gray-500 uppercase">Revenue</p>
                </div>

                {/* Users Card */}
                <div className="rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
                    <FaUsers className="text-4xl text-blue-500 mb-4" />
                    <h3 className="text-2xl font-bold">{stats?.users || 0}</h3>
                    <p className="text-sm text-gray-500 uppercase">Users</p>
                </div>

                {/* Menu Items Card */}
                <div className="rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
                    <FaBoxOpen className="text-4xl text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold">{stats?.menuItems || 0}</h3>
                    <p className="text-sm text-gray-500 uppercase">Menus</p>
                </div>

                {/* Orders Card */}
                <div className="rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow flex flex-col justify-center items-center">
                    <FaTruck className="text-4xl text-red-500 mb-4" />
                    <h3 className="text-2xl font-bold">{stats?.orders || 0}</h3>
                    <p className="text-sm text-gray-500 uppercase">Orders</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Bar Chart */}
                <div className="flex-1 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-4 text-center">Order Quantity by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: -5,
                                left: -30,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="flex-1 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold mb-4 text-center">Revenue Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;