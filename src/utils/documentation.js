const fetch = require('node-fetch');

const docSources = {
    javascript: {
        name: 'JavaScript',
        baseUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        searchUrl: 'https://developer.mozilla.org/api/v1/search?q=',
        searchSuffix: '&locale=en-US',
        topics: {
            array: '/Reference/Global_Objects/Array',
            string: '/Reference/Global_Objects/String',
            object: '/Reference/Global_Objects/Object',
            promise: '/Reference/Global_Objects/Promise',
            async: '/Reference/Statements/async_function',
            map: '/Reference/Global_Objects/Map',
            set: '/Reference/Global_Objects/Set',
            function: '/Reference/Functions',
            class: '/Reference/Classes',
            loop: '/Reference/Statements/for',
            if: '/Reference/Statements/if...else',
            try: '/Reference/Statements/try...catch',
            dom: '/Reference/Web_APIs/Document_Object_Model'
        }
    },
    python: {
        name: 'Python',
        baseUrl: 'https://docs.python.org/3',
        searchUrl: 'https://docs.python.org/3/search.html?q=',
        searchSuffix: '&check_keywords=yes&area=default',
        topics: {
            list: '/library/stdtypes.html#lists',
            dict: '/library/stdtypes.html#dict',
            tuple: '/library/stdtypes.html#tuples',
            set: '/library/stdtypes.html#set',
            string: '/library/stdtypes.html#text-sequence-type-str',
            function: '/tutorial/controlflow.html#defining-functions',
            class: '/tutorial/classes.html',
            exception: '/tutorial/errors.html',
            module: '/tutorial/modules.html',
            file: '/tutorial/inputoutput.html#reading-and-writing-files',
            loop: '/tutorial/controlflow.html#for-statements',
            if: '/tutorial/controlflow.html#if-statements',
            comprehension: '/tutorial/datastructures.html#list-comprehensions'
        }
    },
    html: {
        name: 'HTML',
        baseUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        searchUrl: 'https://developer.mozilla.org/api/v1/search?q=html+',
        searchSuffix: '&locale=en-US',
        topics: {
            elements: '/Element',
            form: '/Element/form',
            input: '/Element/input',
            button: '/Element/button',
            div: '/Element/div',
            span: '/Element/span',
            table: '/Element/table',
            list: '/Element/ul',
            heading: '/Element/Heading_Elements',
            link: '/Element/a',
            image: '/Element/img',
            semantic: '/Guide/HTML5',
            structure: '/Guide/Introduction_to_HTML'
        }
    },
    css: {
        name: 'CSS',
        baseUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
        searchUrl: 'https://developer.mozilla.org/api/v1/search?q=css+',
        searchSuffix: '&locale=en-US',
        topics: {
            selector: '/Selectors',
            box: '/box_model',
            flexbox: '/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox',
            grid: '/CSS_Grid_Layout',
            position: '/position',
            display: '/display',
            color: '/color',
            background: '/background',
            margin: '/margin',
            padding: '/padding',
            animation: '/animation',
            transition: '/transition',
            media: '/Media_Queries',
            transform: '/transform'
        }
    },
    react: {
        name: 'React',
        baseUrl: 'https://react.dev/reference',
        searchUrl: 'https://react.dev/search?q=',
        searchSuffix: '',
        topics: {
            component: '/components',
            props: '/passing-props-to-a-component',
            state: '/useState',
            effect: '/useEffect',
            context: '/useContext',
            ref: '/useRef',
            memo: '/memo',
            callback: '/useCallback',
            reducer: '/useReducer',
            router: '/routing',
            form: '/forms',
            event: '/handling-events',
            lifecycle: '/lifecycle-of-reactive-effects'
        }
    },
    nodejs: {
        name: 'Node.js',
        baseUrl: 'https://nodejs.org/docs/latest/api',
        searchUrl: 'https://nodejs.org/api/search.html?q=',
        searchSuffix: '',
        topics: {
            fs: '/fs.html',
            http: '/http.html',
            path: '/path.html',
            buffer: '/buffer.html',
            stream: '/stream.html',
            events: '/events.html',
            process: '/process.html',
            child_process: '/child_process.html',
            url: '/url.html',
            crypto: '/crypto.html',
            util: '/util.html',
            module: '/module.html',
            net: '/net.html'
        }
    },
    typescript: {
        name: 'TypeScript',
        baseUrl: 'https://www.typescriptlang.org/docs',
        searchUrl: 'https://www.typescriptlang.org/search?q=',
        searchSuffix: '',
        topics: {
            interface: '/handbook/interfaces.html',
            type: '/handbook/everyday-types.html',
            enum: '/handbook/enums.html',
            class: '/handbook/classes.html',
            generic: '/handbook/generics.html',
            function: '/handbook/functions.html',
            union: '/handbook/unions-and-intersections.html',
            utility: '/handbook/utility-types.html',
            namespace: '/handbook/namespaces.html',
            module: '/handbook/modules.html',
            declaration: '/handbook/declaration-files/introduction.html',
            config: '/tsconfig.html',
            compiler: '/handbook/compiler-options.html'
        }
    },
    csharp: {
        name: 'C#',
        baseUrl: 'https://learn.microsoft.com/en-us/dotnet/csharp',
        searchUrl: 'https://learn.microsoft.com/en-us/search/?terms=',
        searchSuffix: '&scope=.NET',
        topics: {
            class: '/fundamentals/types/classes',
            struct: '/language-reference/builtin-types/struct',
            interface: '/fundamentals/types/interfaces',
            enum: '/language-reference/builtin-types/enum',
            property: '/properties',
            method: '/methods',
            event: '/events',
            delegate: '/delegates',
            linq: '/linq',
            async: '/asynchronous-programming',
            exception: '/fundamentals/exceptions',
            collection: '/collections',
            generic: '/fundamentals/types/generics',
            inheritance: '/fundamentals/object-oriented/inheritance'
        }
    },
    java: {
        name: 'Java',
        baseUrl: 'https://docs.oracle.com/en/java/javase/17/docs/api',
        searchUrl: 'https://docs.oracle.com/en/search/?q=',
        searchSuffix: '&category=java',
        topics: {
            class: '/java.base/java/lang/Class.html',
            string: '/java.base/java/lang/String.html',
            array: '/java.base/java/util/Arrays.html',
            list: '/java.base/java/util/List.html',
            map: '/java.base/java/util/Map.html',
            set: '/java.base/java/util/Set.html',
            collection: '/java.base/java/util/Collection.html',
            stream: '/java.base/java/util/stream/Stream.html',
            exception: '/java.base/java/lang/Exception.html',
            thread: '/java.base/java/lang/Thread.html',
            io: '/java.base/java/io/package-summary.html',
            file: '/java.base/java/io/File.html',
            nio: '/java.base/java/nio/package-summary.html',
            reflection: '/java.base/java/lang/reflect/package-summary.html'
        }
    },
    go: {
        name: 'Go',
        baseUrl: 'https://golang.org/pkg',
        searchUrl: 'https://pkg.go.dev/search?q=',
        searchSuffix: '',
        topics: {
            fmt: '/fmt',
            http: '/net/http',
            json: '/encoding/json',
            io: '/io',
            os: '/os',
            time: '/time',
            strings: '/strings',
            strconv: '/strconv',
            sync: '/sync',
            context: '/context',
            reflect: '/reflect',
            regexp: '/regexp',
            sort: '/sort',
            math: '/math',
            crypto: '/crypto',
            database: '/database/sql',
            template: '/html/template'
        }
    },
    ruby: {
        name: 'Ruby',
        baseUrl: 'https://ruby-doc.org/core-3.1.2',
        searchUrl: 'https://ruby-doc.org/search.html?q=',
        searchSuffix: '',
        topics: {
            array: '/Array.html',
            hash: '/Hash.html',
            string: '/String.html',
            symbol: '/Symbol.html',
            numeric: '/Numeric.html',
            class: '/Class.html',
            module: '/Module.html',
            enumerable: '/Enumerable.html',
            comparable: '/Comparable.html',
            file: '/File.html',
            dir: '/Dir.html',
            time: '/Time.html',
            regexp: '/Regexp.html',
            exception: '/Exception.html',
            io: '/IO.html'
        }
    },
    php: {
        name: 'PHP',
        baseUrl: 'https://www.php.net/manual/en',
        searchUrl: 'https://www.php.net/manual-lookup.php?pattern=',
        searchSuffix: '',
        topics: {
            array: '/array.html',
            string: '/string.html',
            function: '/language.functions.html',
            class: '/language.oop5.basic.html',
            interface: '/language.oop5.interfaces.html',
            trait: '/language.oop5.traits.html',
            namespace: '/language.namespaces.html',
            exception: '/language.exceptions.html',
            file: '/filesystem.html',
            date: '/datetime.html',
            json: '/json.html',
            regex: '/pcre.html',
            session: '/session.html',
            pdo: '/book.pdo.html',
            mysql: '/book.mysqli.html'
        }
    },
    swift: {
        name: 'Swift',
        baseUrl: 'https://docs.swift.org/swift-book',
        searchUrl: 'https://developer.apple.com/search/?q=',
        searchSuffix: '&type=Documentation',
        topics: {
            class: '/LanguageGuide/ClassesAndStructures.html',
            struct: '/LanguageGuide/ClassesAndStructures.html#ID88',
            enum: '/LanguageGuide/Enumerations.html',
            property: '/LanguageGuide/Properties.html',
            method: '/LanguageGuide/Methods.html',
            protocol: '/LanguageGuide/Protocols.html',
            extension: '/LanguageGuide/Extensions.html',
            closure: '/LanguageGuide/Closures.html',
            optional: '/LanguageGuide/TheBasics.html#ID330',
            array: '/LanguageGuide/CollectionTypes.html#ID107',
            dictionary: '/LanguageGuide/CollectionTypes.html#ID113',
            string: '/LanguageGuide/StringsAndCharacters.html',
            error: '/LanguageGuide/ErrorHandling.html'
        }
    },
    rust: {
        name: 'Rust',
        baseUrl: 'https://doc.rust-lang.org/stable',
        searchUrl: 'https://doc.rust-lang.org/stable/std/?search=',
        searchSuffix: '',
        topics: {
            struct: '/book/ch05-00-structs.html',
            enum: '/book/ch06-00-enums.html',
            trait: '/book/ch10-02-traits.html',
            ownership: '/book/ch04-00-understanding-ownership.html',
            borrowing: '/book/ch04-02-references-and-borrowing.html',
            lifetime: '/book/ch10-03-lifetime-syntax.html',
            match: '/book/ch06-02-match.html',
            error: '/book/ch09-00-error-handling.html',
            closure: '/book/ch13-01-closures.html',
            iterator: '/book/ch13-02-iterators.html',
            module: '/book/ch07-00-managing-growing-projects.html',
            cargo: '/cargo/index.html',
            vector: '/std/vec/struct.Vec.html',
            string: '/std/string/struct.String.html'
        }
    },
    lua: {
        name: 'Lua',
        baseUrl: 'https://www.lua.org/manual/5.4',
        searchUrl: 'https://www.google.com/search?q=site:lua.org+',
        searchSuffix: '',
        topics: {
            table: '/manual.html#6.6',
            string: '/manual.html#6.4',
            function: '/manual.html#3.4.10',
            coroutine: '/manual.html#6.2',
            module: '/manual.html#6.3',
            metatable: '/manual.html#2.4',
            error: '/manual.html#2.3',
            io: '/manual.html#6.8',
            math: '/manual.html#6.7',
            os: '/manual.html#6.9',
            debug: '/manual.html#6.10',
            syntax: '/manual.html#3',
            variable: '/manual.html#3.2',
            operator: '/manual.html#3.4.8'
        }
    },
    kotlin: {
        name: 'Kotlin',
        baseUrl: 'https://kotlinlang.org/docs/reference',
        searchUrl: 'https://kotlinlang.org/docs/home.html?q=',
        searchSuffix: '',
        topics: {
            class: '/classes.html',
            function: '/functions.html',
            property: '/properties.html',
            interface: '/interfaces.html',
            inheritance: '/inheritance.html',
            extension: '/extensions.html',
            lambda: '/lambdas.html',
            collection: '/collections-overview.html',
            coroutine: '/coroutines-overview.html',
            flow: '/flow.html',
            null: '/null-safety.html',
            generics: '/generics.html',
            delegation: '/delegation.html',
            dsl: '/type-safe-builders.html'
        }
    },
    c: {
        name: 'C',
        baseUrl: 'https://en.cppreference.com/w/c',
        searchUrl: 'https://en.cppreference.com/mwiki/index.php?title=Special%3ASearch&search=',
        searchSuffix: '&go=Go',
        topics: {
            stdio: '/io',
            stdlib: '/program',
            string: '/string/byte',
            memory: '/memory',
            math: '/numeric/math',
            time: '/chrono',
            array: '/language/array',
            pointer: '/language/pointer',
            struct: '/language/struct',
            function: '/language/functions',
            preprocessor: '/preprocessor',
            typedef: '/language/typedef',
            enum: '/language/enum',
            macro: '/preprocessor/replace',
            file: '/io/FILE',
            error: '/error',
            threads: '/thread'
        }
    },
    cpp: {
        name: 'C++',
        baseUrl: 'https://en.cppreference.com/w/cpp',
        searchUrl: 'https://en.cppreference.com/mwiki/index.php?title=Special%3ASearch&search=',
        searchSuffix: '&go=Go',
        topics: {
            vector: '/container/vector',
            string: '/string/basic_string',
            map: '/container/map',
            algorithm: '/algorithm',
            iostream: '/io/basic_iostream',
            class: '/language/classes',
            template: '/language/templates',
            inheritance: '/language/derived_class',
            stl: '/container',
            smart_pointer: '/memory',
            lambda: '/language/lambda',
            thread: '/thread/thread',
            exception: '/error/exception',
            namespace: '/language/namespace',
            iterator: '/iterator',
            regex: '/regex',
            chrono: '/chrono'
        }
    }
};

/**
 * @param {string} language - The programming language
 * @param {string} query - The documentation query
 * @returns {Promise<Object>} - Documentation result
 */
async function getDocumentation(language, query) {
    language = language.toLowerCase();
    
    if (!docSources[language]) {
        return {
            success: false,
            message: `Documentation for ${language} is not supported. Available languages: ${Object.keys(docSources).join(', ')}`
        };
    }
    
    const langDocs = docSources[language];
    
    const queryLower = query.toLowerCase();
    for (const [topic, path] of Object.entries(langDocs.topics)) {
        if (queryLower.includes(topic)) {
            return {
                success: true,
                title: `${langDocs.name} ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
                url: `${langDocs.baseUrl}${path}`,
                content: `Here's documentation about ${topic} in ${langDocs.name}. Check out the full documentation at ${langDocs.baseUrl}${path}`
            };
        }
    }
    
    try {
        const searchUrl = `${langDocs.searchUrl}${encodeURIComponent(query)}${langDocs.searchSuffix}`;
        
        if (language === 'javascript' || language === 'html' || language === 'css') {
            const response = await fetch(searchUrl);
            const data = await response.json();
            
            if (data.documents && data.documents.length > 0) {
                const topResult = data.documents[0];
                return {
                    success: true,
                    title: topResult.title,
                    url: `https://developer.mozilla.org${topResult.mdn_url}`,
                    content: topResult.summary || `Found a result for "${query}" in ${langDocs.name} documentation.`
                };
            }
        }
        
        return {
            success: true,
            title: `${langDocs.name} Documentation: ${query}`,
            url: searchUrl,
            content: `Here's a search for "${query}" in the ${langDocs.name} documentation. Click the link to view the results.`
        };
        
    } catch (error) {
        console.error(`Error searching ${language} documentation:`, error);
        return {
            success: false,
            message: `Error searching ${language} documentation. Please try again later.`
        };
    }
}

/**
 * @returns {Object} - Language categories
 */
function getLanguageCategories() {
    return {
        web: ['javascript', 'html', 'css', 'react', 'nodejs', 'typescript'],
        systems: ['csharp', 'java', 'rust', 'go', 'kotlin', 'c', 'cpp'],
        scripting: ['python', 'ruby', 'php', 'swift', 'lua']
    };
}

module.exports = {
    getDocumentation,
    supportedLanguages: Object.keys(docSources),
    getLanguageCategories,
    docSources
};
