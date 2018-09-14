<template>
  <div class="test-git-graph">
    <p>GIT NETWORK</p>
    <canvas id="gitGraph"></canvas>
  </div>
</template>

<script>
import 'gitgraph.js/build/gitgraph'

export default {
  name: 'gitGraph',
  data() {
    return {
      data: [
        { taskId: 1, branch: 'master', parentBranch: '', action: 'branch', message: '我创建一个master分支', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-------------', userId: 1, userName: '姬海南', data: 1536747139 },
        { taskId: 1, branch: 'master', parentBranch: '', action: 'commit', message: '第一次提交', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 1, userName: '姬海南', data: 1536747139 },
        { taskId: 1, branch: 'master', parentBranch: '', action: 'commit', message: '第二次提交', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 1, userName: '姬海南', data: 1536747139 },
        { taskId: 1, branch: 'master', parentBranch: '', action: 'commit', message: '第三次提交', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 1, userName: '姬海南', data: 1536747139 },
        { taskId: 1, branch: 'test1', parentBranch: 'master', action: 'branch', message: '傻子创建了一个test1分支', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '傻子', data: 1536747139 },
        { taskId: 1, branch: 'test1', parentBranch: 'master', action: 'commit', message: '傻子第一次提交', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '傻子', data: 1536747139 },
        { taskId: 1, branch: 'test1', parentBranch: 'master', action: 'commit', message: '傻子第二次提交', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '傻子', data: 1536747139 },
        { taskId: 1, branch: 'test1', parentBranch: 'master', action: 'merge', message: '合并test1分支到master', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 1, userName: '姬海南', data: 1536747139 },
        { taskId: 1, branch: 'test2', parentBranch: 'master', action: 'branch', message: '瘸子创建了一个test2分支', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '傻子', data: 1536747139 },
        { taskId: 1, branch: 'test2', parentBranch: 'master', action: 'commit', message: '瘸子第一次提交', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '傻子', data: 1536747139 },
        { taskId: 1, branch: 'test2', parentBranch: 'master', action: 'commit', message: '瘸子第二次提交', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '傻子', data: 1536747139 },
        { taskId: 1, branch: 'test2', parentBranch: 'master', action: 'commit', message: '瘸子第一次提交', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '傻子', data: 1536747139 },
        { taskId: 1, branch: 'myBranch1', parentBranch: 'master', action: 'branch', message: '创建了一个myBranch分支', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 4, userName: '姬海南', data: 1536747139 },
        { taskId: 1, branch: 'myBranch1', parentBranch: 'master', action: 'commit', message: 'myBranch分支第一次提交', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 4, userName: '姬海南', data: 1536747139 },
        { taskId: 1, branch: 'test2', parentBranch: 'master', action: 'merge', message: '合并test2分支到master', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 4, userName: '姬海南', data: 1536747139 },
        // { taskId: 1, branch: 'test2', parentBranch: 'master', action: 'merge', message: '合并test2分支到master', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 4, userName: '姬海南', data: 1536747139 },
        // { taskId: 1, branch: 'test2', parentBranch: 'master', action: 'merge', message: '合并test2分支到master', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '姬海南', data: 1536747139 },
        // { taskId: 1, branch: 'test2', parentBranch: 'master', action: 'merge', message: '合并test2分支到master', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '姬海南', data: 1536747139 },
        // { taskId: 1, branch: 'test2', parentBranch: 'master', action: 'merge', message: '合并test2分支到master', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '姬海南', data: 1536747139 },
        // { taskId: 1, branch: 'test2', parentBranch: 'master', action: 'merge', message: '合并test2分支到master', sha1: '4d5c01842f37d90651f9693783c6564279fed6f4', tag: '-----------------', userId: 2, userName: '姬海南', data: 1536747139 },
      ]
    }
  },
  mounted() {
    this.initGitGraph()
  },
  methods: {
    initGitGraph() {

      var gitgraph = new GitGraph({
        template: "blackarrow",
      })

      console.log(gitgraph)

      let indexArray = []
      let j = 0
      let branchMap = new Map()

      for (let i = 0; i < this.data.length; i++) {
        const element = this.data[i]
        if (indexArray[element.userId] === undefined) {
          indexArray[element.userId] = j
          j = j + 1
        }

        switch (element.action) {
          case 'branch':
            const branchConfig = {}
            branchConfig.parentBranch = branchMap.get(element.parentBranch)
            branchConfig.column = indexArray[element.userId]
            branchConfig.name = element.branch

            branchMap.set(element.branch, gitgraph.branch(branchConfig))
            break;

          case 'commit':
            const commitConfig = {}
            commitConfig.message = element.message
            commitConfig.tag = element.tag
            commitConfig.displayTagBox = false

            branchMap.get(element.branch).commit(commitConfig)
            break;

          case 'merge':
            const mergeConfig = {}
            mergeConfig.message = element.message
            mergeConfig.tag = element.tag
            // const currentBranch = window[element.branch]
            // const targetBranch = window[element.parentBranch]
            // console.log(targetBranch)
            // currentBranch.merge(targetBranch, mergeConfig)
            branchMap.get(element.branch).merge(branchMap.get(element.parentBranch))
            break;
          default:
            break;
        }
      }
      var master = gitgraph.branch("master");

      // gitgraph.commit().commit().commit();         // 3 commits upon HEAD
      // var develop = gitgraph.branch("develop");    // New branch from HEAD
      // var myfeature = develop.branch("myfeature"); // New branch from develop

      // // Well, if you need to go deeper…

      // var hotfix = gitgraph.branch({
      //   parentBranch: develop,
      //   name: "hotfix",
      //   column: 2             // which column index it should be displayed in
      // });

      // master.commit("This commit is mine"); // Add a commit on master branch

      // develop.commit({
      //   dotColor: "white",
      //   dotSize: 10,
      //   dotStrokeWidth: 10,
      //   sha1: "666",
      //   message: "Pimp dat commit",
      //   author: "Jacky <prince@dutunning.com>",
      //   tag: "a-super-tag",
      //   onClick: function (commit) {
      //     console.log("Oh, you clicked my commit?!", commit);
      //   }
      // })
    }
  }

}
</script>

<style>
</style>
