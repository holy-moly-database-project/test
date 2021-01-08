# clean work place variables
rm(list = ls())

# sequel
seq(1,100,2)

# sample
sample(1:10, size = 2)

# paste
paste(1,2,3, sep = ",") # default is "space"
# 1,2,3
paste0(1,2,3) # 123
paste0(1:3, collapse = ",") # 1,2,3

#function
cvt <- function(f){
  c <- (f - 32)*5/9
  return(c)
}
cvt(32)
cvt(212)

# 算各種率可以用mean()套在logical vector上
a <- c(1,2,3,4,5,2,3,4,2)
mean(a == 2)

# rep
a <- rep(c("a", "b"), times = 2) # a b a b
rep(c("a", "b"), times = 1:2) # a b b 
rep(c("a", "b"), times = c(2, 2)) # a a b b

# replicate
replicate(1000, sum(sample(1:6, size = 2)))

# dataframe
library(readr)
library(dplyr)
babynames <- read_csv("C:\\Users\\林羿均\\Downloads\\06\\06\\babynames.csv")

test <- babynames %>% mutate(percent = prop*100) %>%
  filter(sex == "M")
test2 <- babynames %>% group_by(sex) %>% summarise(count = n())

<<<<<<< HEAD
#test
#dddd
=======
#test1
>>>>>>> 2d46860ba6ee9585620079456280e945ed0c7e1a
