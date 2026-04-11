import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

// 👉 agora com horário real
const dataUmidade = [
  { tempo: "1", umidade: 32 },
  { tempo: "2", umidade: 30 },
  { tempo: "3", umidade: 50 },
  { tempo: "4", umidade: 20 },
  { tempo: "5", umidade: 70 },
  { tempo: "6", umidade: 32 },
  { tempo: "7", umidade: 30 },
  { tempo: "8", umidade: 50 },
  { tempo: "9", umidade: 20 },
  { tempo: "10", umidade: 70 },
];

const dataTemperatura = [
  { tempo: "1", temperatura: 25 },
  { tempo: "2", temperatura: 27 },
  { tempo: "3", temperatura: 29 },
  { tempo: "4", temperatura: 23 },
  { tempo: "5", temperatura: 31 },
  { tempo: "6", temperatura: 25 },
  { tempo: "7", temperatura: 27 },
  { tempo: "8", temperatura: 29 },
  { tempo: "9", temperatura: 23 },
  { tempo: "10", temperatura: 31 },
];

export const Grafico = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={dataUmidade}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="tempo" padding={{ left: 20, right: 20 }} />
          <YAxis tickFormatter={(value) => `${value}%`} />

          <Tooltip
            formatter={(value) => [`${value}%`, "Umidade"]}
            labelFormatter={(label) => `Horário: ${label}`}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="umidade"
            stroke="#8884d8"
            name="Umidade"
            strokeWidth={2}
            dot={{ r: 4 }}
            label={({ x, y, value }) => (
              <text x={x} y={y - 10} fill="#8884d8" fontSize={12} textAnchor="middle">
                {value}%
              </text>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GraficoTemperatura = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={dataTemperatura}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="tempo" padding={{ left: 20, right: 20 }} />
          <YAxis tickFormatter={(value) => `${value}°C`} />

          <Tooltip
            formatter={(value) => [`${value}°C`, "Temperatura"]}
            labelFormatter={(label) => `Horário: ${label}`}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="temperatura"
            stroke="red"
            name="Temperatura"
            strokeWidth={2}
            dot={{ r: 4 }}
            label={({ x, y, value }) => (
              <text x={x} y={y - 10} fill="red" fontSize={12} textAnchor="middle">
                {value}°C
              </text>
            )}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};