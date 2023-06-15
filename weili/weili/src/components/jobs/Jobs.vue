<template>
    <div>
        <ul class="double_bor_list jobs_list">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="招聘岗位" prop="name" width="395px">
                </el-table-column>
                <el-table-column label="招聘部门" prop="department" width="180px">
                </el-table-column>
                <el-table-column label="学历要求" prop="education" width="140px">
                </el-table-column>
                <el-table-column label="预计薪资" prop="salary" width="150px">
                </el-table-column>
                <el-table-column label="招聘人数" prop="number" width="140px">
                </el-table-column>
                <el-table-column label="发布时间" prop="time" width="140px">
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="d">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <ul>
                                <li>
                                    <h5>岗位职责:</h5>
                                    <p v-html="d.row.responsibilities"></p>
                                </li>
                                <li>
                                    <h5>岗位要求:</h5>
                                    <p v-html="d.row.requirements"></p>
                                </li>
                                <li>
                                    <h5>岗位要求:</h5>
                                    <p v-html="d.row.welfare"></p>
                                </li>
                            </ul>
                        </el-form>
                    </template>
                </el-table-column>
            </el-table>
        </ul>
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="page" :page-size="size" prev-text="上一页" next-text="下一页" background
                hide-on-single-page layout="total, slot, prev, pager,next" :pager-count="11" :total="total">
                <span class="slot" @click="firstPage" v-if="firstShow"> <!-- 做slot插槽 -->
                    首页
                </span>
            </el-pagination>
            <el-pagination :current-page.sync="page" :page-size="size" layout="slot" :pager-count="11"
                :total="total" hide-on-single-page>
                <span class="slot" @click="lastPage" v-if="lastShow">
                    末页
                </span>
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from "@/utils/request";
import { formatDate } from '@/utils/formatDate';

export default {
    data() {
        return {
            jobs: [],
            total: 0,
            size: 10,
            page: 1,
            tableData: [],
            firstShow: false,
            lastShow: true
        };
    },
    mounted() {
        this.getData(1);
    },
    computed: {
        pager() {
            return Math.ceil(this.total / this.size);
        }
    },
    methods: {
        getData() {
            axios({
                url: "index.php?table=jobs",
                params: { page: this.page, limit: this.size }
            }).then(res => {
                this.jobs = res.data;
                this.tableData = res.data;
                this.total = Number(res.count);
                this.title = this.jobs ? '招聘信息' : '',
                document.title = this.title + '-南昌为力人力资源服务有限公司';
                this.state();
            })
        },
        formatDate(time) {
            return formatDate(time);
        },
        handleSizeChange(size){
            this.size = size;
            this.getData();
        },
        handleCurrentChange(page){
            this.page = page;
            this.state();
            this.getData();
        },
        firstPage(){         // 点击进入首页
            this.page = 1;
            this.state();
            this.getData();
        },
        lastPage(){         // 点击进入末页
            this.page = Math.ceil(this.total / this.size);
            this.state();
            this.getData();
        },
        state() {        // 限制首页与末页出现
            if (this.page == this.pager || (this.pager < 12) || (this.page > this.pager-5)) {
                this.lastShow = false;
            } else {
                this.lastShow = true;
            }
            if (this.page >= 12) {
                this.firstShow = true;
            } else {
                this.firstShow = false;
            }
        }
    },
};
</script>