import React, { useState, useEffect} from 'react';
import data from './assets/data.json'
import JobBoardComponent from './components/JobBoardComponent'


function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    setJobs(data);
  }, []);

  const filterFunc = ({ role, level, tools, languages}) =>
  {
    if (filters.length === 0){
      return true;
    }

    const tags = [role, level];

    if (tools){
      tags.push(...tools);
    }
    if (languages){
      tags.push(...languages);
    }
    return filters.every(filter => tags.includes(filter));
  }
  const filterByTags = (job) =>{
    return job
  }

  const handleTagClick = (tag) => {
    if(filters.includes(tag)) return;
    setFilters([...filters, tag]);
  };

  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !==
    passedFilter));
  };

  const clearFilters = () => {
  setFilters([]);
  };
const filteredJobs = jobs.filter(filterFunc);

  return (
    <>
    <header className='bg-teal-500 mb-12'>
      <img className='w-full ' src='/images/bg-header-desktop.svg' alt='bg-image' />    
      </header>
     <div className='container m-auto'>
        {filters.length > 0 && (
         <div className={`bg-white shadow-md 
         -my-20 mb-16 z-10 relative mx-10 p-6 rounded`}> 
         {filters.map((filter) => (
         <span 
         className='cursor-pointer
           font-bold mr-4 mb-4  rounded sm:mb-0'
          onClick={() => 
          handleFilterClick(filter)}>
          <span className='text-teal-500 bg-teal-100 p-2 rounded'>×{filter}</span>
          
          </span>
        )) }
        <button onClick={clearFilters}
         className='font-bold text-gray-700 float-right'>Clear</button>
      </div>
  )}
  {jobs.length === 0 ? (
    <p>jobs are fetching...</p>
  ): ( 
    filteredJobs.map((job) => <JobBoardComponent job={job} key= 
    {job.id}
    handleTagClick = {handleTagClick} />)
  )}
  </div>
  </>
  );
}

export default App;
