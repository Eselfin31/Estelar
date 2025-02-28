const { snippet } = require('./src/commands/snippet');

const mockMessage = {
    channel: {
        send: (content) => {
            console.log('Message sent:');
            console.log(content);
            return Promise.resolve();
        }
    },
    reply: (content) => {
        console.log('Reply sent:');
        console.log(content);
        return Promise.resolve();
    }
};

async function runTests() {
    console.log('Test 1: JavaScript snippet');
    await snippet(null, mockMessage, ['javascript', 'const', 'hello', '=', '"world";']);
    
    console.log('\nTest 2: Python snippet');
    await snippet(null, mockMessage, ['python', 'def', 'hello():', 'print("Hello,', 'world!")']);
    
    console.log('\nTest 3: C++ snippet');
    await snippet(null, mockMessage, ['cpp', '#include', '<iostream>', 'int', 'main()', '{', 'std::cout', '<<', '"Hello,', 'world!";', 'return', '0;', '}']);
    
    console.log('\nTest 4: No code provided');
    await snippet(null, mockMessage, ['javascript']);
    
    console.log('\nTest 5: Help information');
    await snippet(null, mockMessage, []);
}

runTests();
