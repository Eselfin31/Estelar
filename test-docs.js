const { getDocumentation } = require('./src/utils/documentation');

async function test() {
    console.log('Testing C documentation:');
    const cResult = await getDocumentation('c', 'pointer');
    console.log(JSON.stringify(cResult, null, 2));
    
    console.log('\nTesting C++ documentation:');
    const cppResult = await getDocumentation('cpp', 'vector');
    console.log(JSON.stringify(cppResult, null, 2));
}

test();
