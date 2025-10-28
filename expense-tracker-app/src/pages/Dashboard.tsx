import ExpenseForm from "../components/ExpenseForm";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
    { name: "Food", value: 400 },
    { name: "Transport", value: 300 },
    { name: "Entertainment", value: 200 },
    { name: "Bills", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard= () => {
    return (
        <div className="flex flex-row gap-6 p-6">
            <div className="w-1/2">
                <ExpenseForm />
            </div>
            <div className="w-1/2 bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                    Current Month Expenses
                </h2>
                <PieChart width={300} height={300}>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default Dashboard;
