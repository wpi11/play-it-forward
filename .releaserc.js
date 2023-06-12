module.exports = {
	branches: ['main'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'angular',
				releaseRules: [
					{ type: 'fix', scope: 'CHANGELOG_TEST', release: false },
					{ type: 'feat', scope: 'README_TEST', release: false },
					{ type: 'docs', scope: 'README_TEST', release: false },
					{ type: 'chore', scope: 'README_TEST', release: false },
					{ type: 'refactor', release: false },
					{ type: 'style', release: false }
				],
				parserOpts: {
					noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
				}
			}
		],
		'@semantic-release/release-notes-generator',
		'@semantic-release/changelog',
		'@semantic-release/git'
		// [
		// 	'@semantic-release/npm',
		// 	{
		// 		npmPublish: false
		// 	}
		// ]
	]
};
