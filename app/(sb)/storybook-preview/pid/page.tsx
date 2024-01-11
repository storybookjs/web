
    const page = () => {
      const ppidTag = '__ppid_' + process.ppid + '__';
      return <>{ppidTag}</>;
    };
    export default page;