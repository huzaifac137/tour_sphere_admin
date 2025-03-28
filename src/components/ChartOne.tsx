import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

// Assuming the rest of the component remains unchanged, only modifying the useEffect part
const ChartOne: React.FC<ChartOneProps> = ({ userGraphData , heading }) => {
  const [series, setSeries] = useState([{ name: 'Users', data: [] }]);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<ApexOptions>({
    // Initial chart options, will need to dynamically update 'xaxis.categories'
    // Add the initial options here, the same way as defined earlier
  });

  useEffect(() => {
    if (userGraphData?.length) {
      // Transforming the createdAt string into a readable month-year format
      const userCountsByMonthYear = userGraphData.reduce((acc, { createdAt }) => {
        const date = new Date(createdAt);
        const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
        acc[monthYear] = (acc[monthYear] || 0) + 1;
        return acc;
      }, {});

      const sortedMonths = Object.keys(userCountsByMonthYear).sort((a, b) => 
        new Date(a) - new Date(b)
      );

      const data = sortedMonths.map(month => userCountsByMonthYear[month]);

      setSeries([{ name: 'Users', data }]);
      setOptions(prevOptions => ({
        ...prevOptions,
        xaxis: { ...prevOptions.xaxis, categories: sortedMonths },
      }));
      setIsLoading(false);
    }
  }, [userGraphData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full">
              <p className="font-semibold text-secondary">{heading} Registered</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
        <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
