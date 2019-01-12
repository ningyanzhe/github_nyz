<template>
  <div class="list_wrap">
    <!-- 列表 -->
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column label="Name" prop="name">
      </el-table-column>
      <el-table-column label="City" prop="city">
        </el-table-column>
      <el-table-column label="Address" prop="address">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹框 -->
    <el-dialog title="编辑" :visible.sync="centerDialogVisible" width="auto" center>
      <span slot="footer" class="dialog-footer">
        <!-- 表单 -->
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm2.name"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="ruleForm2.city"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model.number="ruleForm2.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import "./list.css"
  export default {
    data() {
      //编辑规则
      var rule_address = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('地址不能为空'));
        }
        setTimeout(() => {
         callback()
        }, 1000);
      };
      var rule_name = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          callback();
        }
      };
      var rule_city = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('城市不能为空'));
        }else {
          callback();
        }
      };
      return {
        //编辑弹框开关
        centerDialogVisible: false,
        //列表数据
        tableData: [{
          city: '北京',
          name: '宁燕哲',
          address: '北京市普陀区金沙江路 1518 弄'
        }, {
          city: '天津',
          name: '张永毅',
          address: '天津市普陀区金沙江路 1517 弄'
        }, {
          city: '上海',
          name: '任柯浩',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          city: '杭州',
          name: '黄   林',
          address: '杭州市普陀区金沙江路 1516 弄'
        }],
        search: '',
        //return内编辑规则
        ruleForm2: {
          name: '',
          city: '',
          address: ''
        },
        rules2: {
          name: [
            { validator: rule_name, trigger: 'blur' }
          ],
          city: [
            { validator: rule_city, trigger: 'blur' }
          ],
          address: [
            { validator: rule_address, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //点击编辑
      handleEdit(index, row) {
        this.centerDialogVisible = true
        let newobj={
          name: row.name,
          city: row.city,
          address: row.address
        }
        this.ruleForm2=newobj
        console.log(index, row);
      },
      //点击删除
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //编辑提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.centerDialogVisible=false
            setTimeout(()=>{
              this.$message({
                type: 'success',
                message: '编辑成功!'
              });
              this.$refs[formName].resetFields();
            },1000)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //编辑重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
</script>
<style>

</style>